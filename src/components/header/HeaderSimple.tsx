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

import { Link } from '@umijs/max';
import { Image, Space } from 'antd';

const HeaderSimple: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`z-50 max-w-5xl w-full items-center justify-between text-sm lg:flex ${
        className || ''
      }`}
    >
      <div className="fixed left-0 top-0 flex w-full justify-center items-center pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:bg-opacity-10 lg:p-4">
        <Space>
          <code className="font-bold">. MODU 墨读</code>
          <span>|</span>
          <code>
            Speak <span className="font-bold">FREELY</span> with Me!
          </code>
        </Space>
      </div>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Link
          to="/login"
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        >
          <Image
            src="/logo.png"
            alt="ModuBit Logo"
            width={60}
            height={60}
            preview={false}
          />
        </Link>
      </div>
    </div>
  );
};

export default HeaderSimple;
