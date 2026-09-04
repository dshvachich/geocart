import 'reflect-metadata'
import { Container } from 'inversify'
import { AppStore } from '@/app-shell/app-store'

const di = new Container()

di.bind(AppStore).toConstantValue(new AppStore())

export { di }
