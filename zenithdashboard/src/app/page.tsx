import Layout from './components/Layout';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout>
        <div className="flex">
          <main className="flex-1">{children}</main>
        </div>
        </Layout>
  );
}