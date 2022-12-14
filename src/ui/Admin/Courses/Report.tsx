import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    VStack,
  } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

export const ReportCourses = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const userState = useSelector((state: ApplicationState) => state.user);
    const { profile } = useSelector((state: ApplicationState) => state.profile);
    const dispatch = useDispatch();

    const generateReport = () => {
        if (startDate !== '' || endDate !== '') {
            axios.get(`${Constants.API_URL}courses/enrollments/report?start_date=${startDate}&end_date=${endDate}`, {
                headers: {
                    Bearer: `${userState.data?.access_token}`,
                }
            }).then((res) => {
                console.log(res.data);

            const rows = [
                ["CURSO", "DATA DO CURSO", "NOME COMPLETO", "E-MAIL", "CPF-CNPJ", "PROFISSÃO", "WHATSAPP", "CATEGORIAS DO CURSO", "USUÁRIO PARTICIPOU"],
                ...res.data.map((user: any) => {
                return [
                    user.course_name,
                    user.date,
                    user.name,
                    user.email,
                    user.document,
                    user.occupation,
                    user.phone,
                    user.categories,
                    user.user_participated ? "Sim" : "Não"
                ]
                })
            ]
            const ws = XLSX.utils.aoa_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Relatório de Cursos");
            XLSX.writeFile(wb, `relatorio-${startDate}-${endDate}.xlsx`);
            });
        }
    }
    
    return (
       <>
        <Button onClick={onOpen} colorScheme={"blue"}>Gerar CSV</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Geração de relatório</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* input type date */}
            <VStack gap={4} as="form">
                <FormControl isRequired>
                    <FormLabel>Início do relatório</FormLabel>
                    <Input type="date" onChange={e => setStartDate(e.target.value)} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Fim do relatório</FormLabel>
                    <Input type="date" onChange={e => setEndDate(e.target.value)}  />
                </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='green' onClick={generateReport}>Gerar relatório</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
       </>
    )
}