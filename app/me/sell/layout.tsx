export default async function SellLayout({
  children
}: React.PropsWithChildren) {
  return (
    <div>
      <h1 className='mb-2 font-heading text-3xl'>Want To Sell</h1>

      {children}
    </div>
  )
}
