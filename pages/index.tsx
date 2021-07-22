import { useSWRInfinite } from 'swr';
import { query } from './index.query';
import dotProp from 'dot-prop-immutable';
import request from 'graphql-request';
import { GridLayout } from '@egjs/react-infinitegrid';

const Home = () => {

  const getKeyInfinite = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return [query.searchPlopProductsPage(), pageIndex] // SWR key
  }

  const {data: products, error, size, setSize,} =
    useSWRInfinite(getKeyInfinite, (query, offset) =>
    request('/api/graphql', query, {filters: {}, sorts: [], offset, limit: 20}).then((r) => {
      return r.searchPlopProductsPage.products
    })
  )

  const item = (product:any) => {
    return (
      <div style={{ width: 200 }} key={product.productId}>
        <img src={product.productImage.imageUrl} style={{ width: 200 }} alt={''}/>
        <p>{product.productName}</p>
      </div>
    )
  }

  return (
    <div >
      {products && <GridLayout
          onAppend={(props) => {
            props.startLoading()
            console.log('onAppend', size, props.startLoading)

            if (size < 5) {
              setSize(size + 1)
            }
          }}
          onLayoutComplete={({ isLayout, endLoading }) => {
            console.log('onLayoutComplete', size)
            // @ts-ignore
            !isLayout && endLoading()
          }}
          loading={<div className='loading'>Loading... append</div>}
      >
        {[].concat(...products).map((p) => item(p))}
      </GridLayout>}

    </div>
  )
}

export default Home