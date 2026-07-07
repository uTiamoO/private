/*
 * Loon Response Body Rewrite
 * 用途：本地项目接口测试，修改用户 VIP 相关字段
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  // 当前时间戳，单位：秒
  const now = Math.floor(Date.now() / 1000);

  // 设置 VIP 状态
  obj.is_vip = 1;
  obj.vip_level = 9;

  // VIP 开始时间：当前时间
  obj.vip_start_time = now;

  // VIP 结束时间：2099-12-31 23:59:59
  obj.vip_end_time = 4102415999;

  // 可选：如果你的业务里需要阅读数量不受限，也可以改这些字段
  obj.all_read_count = 999999;
  obj.day_read_count = 999999;

  // 可选：解除封禁状态
  obj.is_banned = false;
  obj.ban_time = 0;
  obj.unban_time = 0;

  $done({
    body: JSON.stringify(obj)
  });

} catch (e) {
  console.log("JSON parse error: " + e);

  $done({
    body
  });
}
