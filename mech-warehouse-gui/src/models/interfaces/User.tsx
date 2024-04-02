import { Address } from './Address'
import { Position } from './Position'

export interface User {
    firstName: string
    lastName: string
    phoneNumber: string
    address: Address
    position: Position
    email: string
    passwordHash: string
}