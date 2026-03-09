/**
 * Cloudflare Pages Worker - Basic Auth 保护
 *
 * 在 Cloudflare Pages 项目的「Settings → Environment variables」中配置：
 *   AUTH_USER  访问用户名（例如：admin）
 *   AUTH_PASS  访问密码（例如：your-password）
 */
export default {
  async fetch(request, env) {
    const user = env.AUTH_USER ?? 'admin';
    const pass = env.AUTH_PASS ?? 'changeme';
    const expected = 'Basic ' + btoa(`${user}:${pass}`);

    const auth = request.headers.get('Authorization');
    if (auth !== expected) {
      return new Response('Unauthorized - 请输入访问密码', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Docs", charset="UTF-8"',
          'Content-Type': 'text/plain; charset=UTF-8',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
