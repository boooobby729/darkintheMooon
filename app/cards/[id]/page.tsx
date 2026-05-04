import CardDetailPage from './CardDetail';

export function generateStaticParams() {
  // Return 'new' as the only pre-rendered path; other IDs are handled client-side
  return [{ id: 'new' }];
}

export default function Page() {
  return <CardDetailPage />;
}
