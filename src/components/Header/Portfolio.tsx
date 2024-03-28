"use client"
import { WalletOutlined } from '@ant-design/icons';
import { Flex, Modal, } from 'antd';
import { useAppDispatch } from '@/lib/store/hooks';
import ModalPortfolio from './Modal/ModalPortfolio';
import { setPrevious } from '@/lib/store/features/portfolio/portfolioSlice';
import Total from './Total';
import { useEffect } from 'react';

export default function Portfolio() {

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(setPrevious())
  }, [])

  const [modal, contextHolder] = Modal.useModal();

  const handleModal = () => {
    modal.info({
      icon: null,
      content: <ModalPortfolio />,
      closable: true,
      maskClosable: true,
      width: '100%',
      footer: false
    })
  }

  return (
    <>
      <Flex justify='center' align='center' gap={10} onClick={handleModal} className='pointer' >
        <Total />
        <WalletOutlined className='pointer' style={{ fontSize: 24, padding: 10 }} />
      </Flex>
      {contextHolder}
    </>
  )
}
