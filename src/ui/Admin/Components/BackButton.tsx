import { IconButton } from "@chakra-ui/react"
import { ArrowLeft } from "phosphor-react"
import { useNavigate } from "react-router-dom"

export const BackButton = () => {
  const navigate = useNavigate()
  return (
    <IconButton icon={<ArrowLeft size="32"/>} onClick={() => navigate(-1)} variant="outline" aria-label={"Voltar"} />
  )
}