export default (history, orderId = 0 , willGoBack  = false ) => {
    if (orderId > 0) {
        history.push({
            pathname: '/orderdetail',
            state: orderId,
            goback : willGoBack
        })
    }
}