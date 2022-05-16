import classes from './Order.module.css'
import Moment from 'react-moment'
const Order = ({ order }) => {
    return (
        <div className={classes.Order}>
            <table className={classes.mainTable}>
                <thead>
                    <tr>
                        <th className={classes.productsTableHeader}>المنتجات</th>
                        <th>تاريخ الطلب</th>
                        <th>المبلغ الكلي </th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "0" }}>
                            <table className={classes.productsTable}>
                                <thead>
                                    <tr>
                                        <th className={classes.nameHeader}>المنتج</th>
                                        <th>الكمية</th>
                                        <th>سعر الوحدة</th>
                                        <th>المقاس</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.orderItems.map((item) =>
                                            <tr key={item._id}>
                                                <td >{item.product.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                                <td>{item.size}</td>
                                            </tr>

                                        )
                                    }
                                </tbody>
                            </table>

                        </td>
                        <td>
                            <Moment format="YYYY-MM-DD">
                                {order.createdAt}
                            </Moment>
                        </td>
                        <td>
                            {
                                order.totalPrice
                            } ج.م
                        </td>

                    </tr >
                </tbody>

            </table >
        </div >

    )
}

export default Order