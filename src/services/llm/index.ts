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
import type { LLM } from './typings';

export enum ModelType {
  /**
   * 文本生成
   */
  TEXT_GENERATION = 'TEXT_GENERATION',

  /**
   * 图像生成
   */
  IMAGE_GENERATION = 'IMAGE_GENERATION',

  /**
   * 视觉识别
   */
  VISION = 'VISION',

  /**
   * 嵌入
   */
  EMBEDDING = 'EMBEDDING',

  /**
   * 文本转语音
   */
  TEXT_TO_SPEECH = 'TEXT_TO_SPEECH',

  /**
   * 语音转文本
   */
  SPEECH_TO_TEXT = 'SPEECH_TO_TEXT',
}

/**
 * 获取所有支持的模型
 * @returns LLM.ProviderSchema
 */
export async function providers(
  options?: Record<string, any>,
): Promise<Response.MultiResponse<LLM.ProviderSchema>> {
  return request<Response.MultiResponse<LLM.ProviderSchema>>(
    `/api/system/llm/providers`,
    {
      method: 'GET',
      params: {},
      ...(options || {}),
    },
  );
}

/**
 * 新增Provider配置
 * @param workspaceUid  空间UID
 * @param providerKey Provider Key
 */
export async function addProviderConfig(
  workspaceUid: string,
  providerKey: string,
  providerConfig: any,
  options?: Record<string, any>,
): Promise<Response.SingleResponse<LLM.ProviderConfig>> {
  return request<Response.SingleResponse<LLM.ProviderConfig>>(
    `/api/workspace/${workspaceUid}/provider/${providerKey}/config`,
    {
      method: 'POST',
      data: providerConfig,
      ...(options || {}),
    },
  );
}

/**
 * 删除Provider配置
 * @param workspaceUid  空间UID
 * @param providerKey Provider Key
 */
export async function removeProviderConfig(
  workspaceUid: string,
  providerKey: string,
  options?: Record<string, any>,
): Promise<Response.SingleResponse<boolean | string>> {
  return request<Response.SingleResponse<boolean | string>>(
    `/api/workspace/${workspaceUid}/provider/${providerKey}/config`,
    {
      method: 'DELETE',
      ...(options || {}),
    },
  );
}

/**
 * Provider配置详情
 * @param workspaceUid  空间UID
 * @param providerKey Provider Key
 */
export async function providerConfigDetail(
  workspaceUid: string,
  providerKey: string,
  options?: Record<string, any>,
): Promise<Response.SingleResponse<LLM.ProviderConfig>> {
  return request<Response.SingleResponse<LLM.ProviderConfig>>(
    `/api/workspace/${workspaceUid}/provider/${providerKey}/config`,
    {
      method: 'GET',
      params: {},
      ...(options || {}),
    },
  );
}

/**
 * 所有已配置的Provider
 * @param workspaceUid  空间UID
 */
export async function allConfiguredProviderConfigs(
  workspaceUid: string,
  options?: Record<string, any>,
): Promise<Response.MultiResponse<LLM.ProviderConfig>> {
  return request<Response.MultiResponse<LLM.ProviderConfig>>(
    `/api/workspace/${workspaceUid}/provider/all/config`,
    {
      method: 'GET',
      params: {},
      ...(options || {}),
    },
  );
}
