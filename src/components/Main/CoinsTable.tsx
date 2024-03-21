"use client"
import { Form, Modal, Table } from 'antd'
import { WalletOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

import { useRouter } from 'next/navigation'

import ModalForm from '../Coin/Modal/ModalForm';
import BuyButton from './BuyButton'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { preSetPortfolio, setPortfolio } from '@/lib/store/features/portfolio/portfolioSlice';
import { searchCoin } from '@/lib/store/features/search/searchSilce';

type DataTableItemType = {
  [key: string]: string,
}

type PropsType = {
  dataSource: DataTableItemType[]
}

export default function CoinsTable({ dataSource }: PropsType) {

  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const search = useAppSelector(state => state.search).toLowerCase();
  const dispatch = useAppDispatch();

  const filterCoins = (coin: DataTableItemType) => {
    const { name, symbol } = coin;
    return name.toLowerCase().includes(search) || symbol.toLowerCase().includes(search)
  }

  const visibleData = search
    ? dataSource.filter(filterCoins)
    : dataSource;

  const modalHandler = (coin: { [key: string]: string }) => {
    modal.confirm({

      centered: true,
      content: <ModalForm data={coin} form={form} />,
      okText: 'Купить',
      cancelText: 'Отмена',
      icon: <WalletOutlined style={{ color: 'black' }} />,
      onOk: () => {
        const payload = { [coin.name]: form.getFieldsValue() };
        dispatch(setPortfolio(payload));
        // dispatch(preSetPortfolio(payload));
        form.resetFields();
      },
      onCancel: () => {
        form.resetFields();
      }
    })
  }

  const columns: TableColumnsType<DataTableItemType> = [
    {
      title: 'Валюта', dataIndex: 'title', key: 'title',
      render: (_, record: DataTableItemType) => {
        const name = record.title.split(' ');
        return <span>{name[0]} <span style={{ color: 'darkgoldenrod' }}>{name[1]}</span></span>
      },
    },
    {
      title: 'Стоимость, $', dataIndex: 'price', key: 'price',
      sorter: (a: DataTableItemType, b: DataTableItemType) => {
        return (+a.price) - (+b.price)
      },
    },
    { title: 'Предложение', dataIndex: 'supply', key: 'supply', responsive: ['md'] },
    { title: 'Капитализация, $', dataIndex: 'capitalization', key: 'capitalization', responsive: ['md'] },
    { title: 'Объем, 24ч', dataIndex: 'volume', key: 'volume', responsive: ['md'] },
    {
      title: 'Изменение, %', dataIndex: 'change', key: 'change',
      render: (_, record: DataTableItemType) => {
        const color = +record.change > 0 ? 'lawngreen' : 'red'
        const title = +record.change > 0 ? `+${record.change}` : record.change
        return <span style={{ color }}>{title}</span >
      },
      sorter: (a: DataTableItemType, b: DataTableItemType) => {
        return (+a.change) - (+b.change)
      },
      responsive: ['md']
    },
    {
      title: 'Купить', dataIndex: 'buy', key: 'buy',
      render: (_, record: DataTableItemType) => <BuyButton
        coin={record} modalHandler={modalHandler} />,
    },
  ]

  return (
    <>
      <Table
        dataSource={visibleData}
        columns={columns}
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          showSizeChanger: false,
        }}
        size={'large'}
        rowClassName={'pointer'}
        onRow={(record,) => ({
          onClick: () => {
            router.push(record.key, { scroll: true });
            dispatch(searchCoin(''));
          }
        })}
        sortDirections={['descend', 'ascend']}
      />
      {contextHolder}
    </>
  )
}
