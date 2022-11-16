import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, OrderedList, ListItem, UnorderedList } from "@chakra-ui/react"
import axios from "axios"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CertificateModalProps {
    users: any[]
}

export function CertificateModal({users} : CertificateModalProps) {
    console.log(users)
    const userState = useSelector((state: ApplicationState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {id, class_id} = useParams();
    
    function sendCertificates(e: any) {
        axios.post(`${Constants.API_URL}courses/${id}/class/${class_id}/certificate/send`, {}, {headers: {
            Bearer: `${userState.data?.access_token}`
        }})
        toast.success('Certificados sendo gerados e enviados.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          });
        onClose()
    }
    
    return (
      <>
         <Button colorScheme={"green"} onClick={onOpen}>Enviar certificados</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <UnorderedList maxH={'600px'} overflowY={'auto'}>
                {users.map((user, index) => {
                    if (user.user_participated) {
                        return (
                            <ListItem key={index}>&#8226;	 {user.name}</ListItem>
                        )
                    }
                })
                }
                
            </UnorderedList>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme={'green'} onClick={sendCertificates}>Enviar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }