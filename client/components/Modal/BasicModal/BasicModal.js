import {Modal, Icon, ModalContent } from "semantic-ui-react"
export default function BasicModal(props){
    const {show,setShow,title,children,...rest} = props;

    const onClose =()=> setShow(false);

    return (
        <Modal  className="basic-modal" open={show} onClose={onClose} {...rest}>
            <Modal.Header>
                <span>{title}</span> <Icon name="close" onClick={onClose} ></Icon>
            </Modal.Header>
            <ModalContent >{children}</ModalContent>
        </Modal>
    )
}