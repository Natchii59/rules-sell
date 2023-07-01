export default async function BuyLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <h1 className='mb-2 font-heading text-3xl'>Want To Buy</h1>

      {children}
    </div>
  )
}
