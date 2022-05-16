export const cartcontent = (items) => {
    const totalQantity = items.reduce((a, c) => a + c.quantity, 0)
    const totalPrice = items.reduce((a, c) => a + (c.quantity *(c.curerentPrice?c.curerentPrice:c.price) ), 0)
    return {totalQantity,totalPrice}
}