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

import type { Response } from '@/services/typings';
import { request } from '@umijs/max';
import type { SYSTEM } from './typings';

/**
 * 检查是否已经完成系统设置
 * @returns true / false
 */
export async function isSetup(options?: Record<string, any>) {
  return request<Response.SingleResponse<boolean>>(`/api/setup`, {
    method: 'GET',
    params: {},
    ...(options || {}),
  });
}

/**
 * 完成系统设置
 * @param auth 认证信息
 * @returns true / false
 */
export async function setup(
  auth: SYSTEM.SetupCmd,
  options?: Record<string, any>,
) {
  return request<Response.SingleResponse<boolean>>(`/api/setup`, {
    method: 'POST',
    data: auth,
    ...(options || {}),
  });
}