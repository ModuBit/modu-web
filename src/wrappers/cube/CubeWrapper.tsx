/**
 * Copyright 2024 Maner·Fan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import _ from 'lodash';

// import BackgroundFaintly from '@/components/background/BackgroundFaintly';
import styles from './styles.module.scss';

import LanguageChanger from '@/components/language-changer/LanguageChanger';
import IdeaSlogan from '@/components/logo/IdeaSlogan';
import { workspaceService } from '@/services';
import { WorkspaceType } from '@/services/workspace';
import {
  FileTextOutlined,
  GithubOutlined,
  MailOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import {
  FluentEmoji,
  FluentEmojiProps,
  ThemeProvider,
  useControls,
  useCreateStore,
} from '@lobehub/ui';
import { Outlet, history, useLocation, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Layout,
  Menu,
  Popover,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { Bot, Box, Home, Speech, User } from 'lucide-react';
import { useEffect, useState } from 'react';
type MenuItem = Required<MenuProps>['items'][number];

type MenuPath = {
  [key: string]: {
    // 路径
    path: string;
    key: string;
  };
};

const CubeWrapper: React.FC = () => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');

  const store = useCreateStore();
  const control: FluentEmojiProps = useControls(
    {
      emoji: '👨‍🦱',
      size: {
        max: 128,
        min: 16,
        step: 1,
        value: 64,
      },
    },
    { store },
  );

  // 侧边栏收起状态
  const [collapsed, setCollapsed] = useState(true);

  // 菜单项
  const [menuItems, setMenuItems] = useState<{ [key: string]: MenuItem[] }>({});
  // 选择的菜单KEY
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([]);
  // 菜单KEY和跳转路径的映射
  const [menuKeyPath, setMenuKeyPath] = useState<MenuPath>({});

  useEffect(() => {
    // 查询空间列表
    workspaceService.list().then((resp) => {
      const workspaces = resp.content;

      // 私有空间
      const privateSpace = _.head(
        _.filter(
          workspaces,
          (workspace) => workspace.type === WorkspaceType.PRIVATE,
        ),
      );

      // 公共空间
      const publicSpaces =
        _.filter(
          workspaces,
          (workspace) => workspace.type === WorkspaceType.PUBLIC,
        ) || [];

      // 构造菜单项
      const keyPath: MenuPath = {};

      // 默认区域
      const defaultMenuItems: MenuItem[] = [];
      defaultMenuItems.push({
        key: 'menu-chat',
        icon: <Home />,
        label: 'Chat',
      });
      keyPath['menu-chat'] = {
        path: `/cube/chat`,
        key: `/cube/chat`,
      };
      defaultMenuItems.push({
        key: 'menu-personal',
        icon: <User />,
        label: 'Personal',
      });
      keyPath['menu-personal'] = {
        path: `/cube/space/${privateSpace!.uid}/bots`,
        key: `/cube/space/${privateSpace!.uid}`,
      };

      // 市场区域
      const exploreMenuItems: MenuItem[] = [];
      exploreMenuItems.push({
        key: 'menu-store-bot',
        icon: <Bot />,
        label: 'Bot Store',
      });
      keyPath['menu-store-bot'] = {
        path: `/cube/store/bot`,
        key: `/cube/store/bot`,
      };
      exploreMenuItems.push({
        key: 'menu-store-plugin',
        icon: <Box />,
        label: 'Plugin Store',
      });
      keyPath['menu-store-plugin'] = {
        path: `/cube/store/plugin`,
        key: `/cube/store/plugin`,
      };

      // 团队区域
      const teamsMenuItems: MenuItem[] = [];
      if (!_.isEmpty(publicSpaces)) {
        _.forEach(publicSpaces, (space) => {
          teamsMenuItems.push({
            key: `menu-team-${space.uid}`,
            icon: <Speech />,
            label: space.name,
          });
          keyPath[`menu-team-${space.uid}`] = {
            path: `/cube/space/${space.uid}/bots`,
            key: `/cube/space/${space.uid}`,
          };
        });
      }

      setMenuItems({
        default: defaultMenuItems,
        explore: exploreMenuItems,
        teams: teamsMenuItems,
      });

      // 记录菜单对应的跳转路径
      setMenuKeyPath(keyPath);

      // 识别当前页面对应的菜单项
      _.forEach(keyPath, (value, key) => {
        if (_.startsWith(location.pathname, value.key)) {
          setMenuSelectedKeys([key]);
        }
      });
    });
  }, [location.pathname]);

  const onMenuClick = (menuItem: MenuItem) => {
    const key = menuItem!.key! as string;
    setMenuSelectedKeys([key]);
    if (!!menuKeyPath[key]) {
      history.push(menuKeyPath[key]!.path);
    }
  };

  return (
    <ThemeProvider>
      {/* <BackgroundFaintly /> */}
      <ProLayout
        logo="/logo.png"
        title=". CUBE CHAT"
        className={`${styles.layout}`}
        collapsed={collapsed}
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
        route={[]}
        menuHeaderRender={(logo, title) => {
          if (collapsed) return logo;
          return (
            <>
              {logo}
              <span className={`${styles.title} text-colorful`}>{title}</span>
            </>
          );
        }}
        siderMenuType="group"
        menuExtraRender={() => {
          return (
            <>
              <div style={{ marginTop: 24 }} />
              <Space direction="vertical">
                {!collapsed && (
                  <Button block type="primary">
                    <PlusOutlined /> Create Bot
                  </Button>
                )}
                <Menu
                  className="menu-height-30"
                  mode="inline"
                  items={menuItems.default}
                  selectedKeys={menuSelectedKeys}
                  onClick={onMenuClick}
                />
              </Space>

              <Divider />

              <Space direction="vertical">
                {!collapsed && (
                  <Flex justify="space-between" align="center">
                    <Typography.Text type="secondary">Explore</Typography.Text>
                  </Flex>
                )}
                <Menu
                  className="menu-height-30"
                  mode="inline"
                  items={menuItems.explore}
                  selectedKeys={menuSelectedKeys}
                  onClick={onMenuClick}
                />
              </Space>

              <Divider />

              <Space direction="vertical">
                {!collapsed && (
                  <>
                    <Flex justify="space-between" align="center">
                      <Typography.Text type="secondary">Teams</Typography.Text>
                      <Tooltip title="Create Team" color="#E6E6E6">
                        <Button
                          className="text-gray-400"
                          type="text"
                          size="small"
                          icon={<PlusOutlined />}
                        />
                      </Tooltip>
                    </Flex>
                  </>
                )}
                <Menu
                  className="menu-height-30"
                  mode="inline"
                  items={menuItems.teams}
                  selectedKeys={menuSelectedKeys}
                  onClick={onMenuClick}
                />
              </Space>
            </>
          );
        }}
        menuFooterRender={() => {
          if (collapsed) return undefined;
          return (
            <>
              <Divider style={{ margin: '1rem auto' }} />
              <Flex justify="space-between" align="center">
                <Tooltip title="Document" color="#E6E6E6">
                  <Button className="text-gray-500" type="text">
                    <FileTextOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Github" color="#E6E6E6">
                  <Button className="text-gray-500" type="text">
                    <Typography.Link
                      href="https://github.com/CubewiseBit/cube-chat-server"
                      target="_blank"
                      style={{ color: 'inherit' }}
                    >
                      <GithubOutlined />
                    </Typography.Link>
                  </Button>
                </Tooltip>
                <Tooltip title="Feedback" color="#E6E6E6">
                  <Button className="text-gray-500" type="text">
                    <Typography.Link
                      href="mailto:manerfan@163.com"
                      target="_blank"
                      style={{ color: 'inherit' }}
                    >
                      <MailOutlined />
                    </Typography.Link>
                  </Button>
                </Tooltip>
              </Flex>

              <Space className="ml-5">
                <Typography.Text className="text-gray-700">
                  © 2024
                </Typography.Text>
                <Typography.Text
                  strong
                  className="underline decoration-4 decoration-sky-200"
                >
                  . CUBE CHAT
                </Typography.Text>
                <LanguageChanger size="small" />
              </Space>
              <IdeaSlogan className="ml-5 block underline decoration-4 decoration-sky-200" />
            </>
          );
        }}
        avatarProps={{
          size: 'small',
          render: () => {
            return (
              <>
                <Popover trigger="click" title={<></>}>
                  <Button type="text" style={{ height: 50 }}>
                    <Space>
                      <Avatar>
                        <FluentEmoji
                          type={'anim'}
                          {...control}
                          className="-mt-6"
                        />
                      </Avatar>
                      {!collapsed && (
                        <Typography.Text className="hidden md:inline">
                          {initialState?.userMe?.name}
                        </Typography.Text>
                      )}
                    </Space>
                  </Button>
                </Popover>
              </>
            );
          },
        }}
        bgLayoutImgList={[
          {
            src: '/bg/grid-bl.png',
            bottom: 0,
            left: 0,
            width: '420px',
          },
        ]}
      >
        <Layout className={`w-screen min-h-screen flex flex-col`}>
          <Outlet />
        </Layout>
      </ProLayout>
    </ThemeProvider>
  );
};

export default CubeWrapper;
