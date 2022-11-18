import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, OrderedList, ListItem, UnorderedList, CheckboxGroup, VStack, Checkbox } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CertificateModalProps {
    users: any[]
}

export function CertificateModal({users} : CertificateModalProps) {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])
    const userState = useSelector((state: ApplicationState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {id, class_id} = useParams();

    useEffect(() => {
      const participatedUsers = users.filter(user => user.user_participated)
      setSelectedUsers(participatedUsers)
    }, [users])


    function toggleUser(user: any) {
      
      if (selectedUsers.includes(user)) {
        setSelectedUsers(selectedUsers.filter(item => item !== user))
      } else {
        setSelectedUsers([...selectedUsers, user])
      }
    }
    
    function sendCertificates(e: any) {
        axios.post(`${Constants.API_URL}courses/${id}/class/${class_id}/certificate/send`, {
            users: selectedUsers
        }, {headers: {
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
            <ModalHeader>Participantes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <CheckboxGroup>
              <VStack alignItems={'left'}>
                {users.map((user) => {
                  if (user.user_participated) {
                    return <Checkbox value={user.id} defaultChecked={true} key={user.id} onChange={e => {toggleUser(user)}}>{user.name}</Checkbox>
                  }
              })}
              </VStack>
            </CheckboxGroup>
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