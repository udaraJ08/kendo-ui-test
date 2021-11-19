const SaveBtn = ({dataItem}) => {

    const actionHandle = () => {
        console.log(dataItem)
    }

    return <button onClick={() => actionHandle()}>Click ME</button>
}

export default SaveBtn;