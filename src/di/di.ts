import 'reflect-metadata'
import { Container } from 'inversify'
import { httpClient } from '@/network/http-client'

const di = new Container()

di.bind('httpClient').toConstantValue(httpClient)

export { di }
