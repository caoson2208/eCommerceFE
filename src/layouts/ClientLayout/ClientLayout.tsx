import { memo } from 'react'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

function ClientLayoutInner({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  ) 
}

const ClientLayout = memo(ClientLayoutInner)
export default ClientLayout
