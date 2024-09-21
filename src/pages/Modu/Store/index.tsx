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

import { Hero } from '@lobehub/ui';
import { Flex } from 'antd';

const Store: React.FC = () => {
  return (
    <Flex justify="center" align="center" className="h-full w-full">
      <Hero
        description="敬请期待，马上到来！"
        actions={[
          {
            link: '/modu/chat',
            text: '先和我聊聊',
            type: 'primary',
          },
        ]}
        title="<b>. MODU</b> CHAT"
      />
    </Flex>
  );
};

export default Store;