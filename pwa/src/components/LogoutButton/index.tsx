import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../hooks/auth'

import { Container } from './styles'

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth()

  const handleLogOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <Container onPress={handleLogOut}>
      <Feather name="log-out" size={24} color="#000" />
    </Container>
  )
}

export default LogoutButton
