export default async function TradeLayout({
  children
}: React.PropsWithChildren) {
  return (
    <div>
      <h1 className='mb-2 font-heading text-3xl'>Want To Trade</h1>

      {children}
    </div>
  )
}
