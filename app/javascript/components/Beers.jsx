import React from "react"
import { Table, message, Popconfirm } from "antd"

import AddBeerModal from "./AddBeerModal"
import useDeleteBeer from '../hooks/useDeleteBeer'
import useFetchBeers from '../hooks/useFetchBeers'

export default function Beers() {
    const deleteBeer = useDeleteBeer()
    const { beers, refetch: refetchBeers } = useFetchBeers()

    const columns = [{
        title: "Brand",
        dataIndex: "brand",
        key: "brand"
    }, {
        title: "Style",
        dataIndex: "style",
        key: "style"
    }, {
        title: "Country",
        dataIndex: "country",
        key: "style"
    }, {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
    }, {
        title: "",
        key: "action",
        render(_text, record) {
            return (
                <Popconfirm 
                    title="Delete this beer?" 
                    onConfirm={() => deleteBeer(record.id).then(() => refetchBeers())} 
                    okText="Yes" 
                    cancelText="No"
                >
                    <a href="#" type="danger">
                        Delete{" "}
                    </a>
                </Popconfirm>
            )
        }
    }]

    return (
        <>
            <Table 
                className="table-striped-rows" 
                dataSource={beers}
                columns={columns}
                pagination={{pageSize: 5}}
            />
            <AddBeerModal reloadBeers={refetchBeers} />
        </>
    )
}