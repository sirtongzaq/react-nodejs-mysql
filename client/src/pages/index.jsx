import Layout from "@/components/templates/layout"




export default function Page() {
  return (
    <div>
      test
    </div>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}