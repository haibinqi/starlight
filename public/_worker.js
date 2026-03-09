/**
 * Cloudflare Pages Worker - Basic Auth 保护
 *
 * 在 Cloudflare Pages 项目的「Settings → Environment variables」中配置：
 *   AUTH_USER  访问用户名（例如：admin）
 *   AUTH_PASS  访问密码（例如：your-password）
 */
export default {
  async fetch(request, env) {
    const expectedUser = env.AUTH_USER;
    const expectedPass = env.AUTH_PASS;

    if (!expectedUser || !expectedPass) {
      // 调试：显示 env 里有哪些 key
      const keys = Object.keys(env).join(', ') || '（空）';
      return new Response(`AUTH_USER=${env.AUTH_USER}, AUTH_PASS=${env.AUTH_PASS ? '有值' : '无值'}, env keys: ${keys}`, { status: 503 });
    }

    const authHeader = request.headers.get('Authorization') ?? '';
    const unauthorized = () =>
      new Response('Unauthorized - 请输入访问密码', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Docs", charset="UTF-8"',
          'Content-Type': 'text/plain; charset=UTF-8',
        },
      });

    if (!authHeader.startsWith('Basic ')) {
      return unauthorized();
    }

    // 解码 Base64 凭据，分别比对用户名和密码
    let credentials;
    try {
      credentials = atob(authHeader.slice(6));
    } catch {
      return unauthorized();
    }

    const colonIndex = credentials.indexOf(':');
    if (colonIndex === -1) return unauthorized();

    const user = credentials.slice(0, colonIndex);
    const pass = credentials.slice(colonIndex + 1);

    if (user !== expectedUser || pass !== expectedPass) {
      return unauthorized();
    }

    return env.ASSETS.fetch(request);
  },
};
