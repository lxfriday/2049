import { get, post } from "@utils/request";

/**
 * 音频详情
 */
export async function fetchAudioDetailService(id: number) {
  return await get("/song/detail", {
    params: {
      ids: id,
    },
  });
}
