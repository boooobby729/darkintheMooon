import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '72px', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '32px' }}>
        此页面不存在
      </p>
      <Link
        href="/"
        style={{
          padding: '12px 24px',
          background: '#fff',
          color: '#000',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
        }}
      >
        返回首页
      </Link>
    </div>
  );
}
