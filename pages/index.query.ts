export const mutation = {}
export const query = {
  searchPlopProductsPage: () => {
    return `
        query($filters: Object, $sorts: [SortInfo], $offset: Int, $limit: Int) {
          searchPlopProductsPage(filters: $filters, sorts: $sorts, offset: $offset, limit: $limit) {
            limit
            offset
            totalCount
            products {
              productId
              productName
              channelNm
              modDate
              salePrice
              discountSalePrice
              salePercentage
              couponDiscountSalePrice
              couponSalePercentage
              nvMid
              productImage {
                imageUrl
              }
            }
          }
        }
      `
  },
  getStore: (channelNo: string) => {
    return `{
        getStore(channelNo: "${channelNo}") {
          channelNo
          channelName
          channelUrl
          representImageUrl
          pickCount
          styleTags {
            code
            text
          }
        }
    }`
  },
  getStoreByChannelNm: (channelNm: string) => {
    return `{
        getStoreByChannelNm(channelNm: "${channelNm}") {
          channelNo
          channelName
          channelUrl
          representImageUrl
          pickCount
          styleTags {
            code
            text
          }
        }
    }`
  },
}
