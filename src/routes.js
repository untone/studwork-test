import Starships from './components/starships'
import Starship from './components/starship'

const routes = [
  {
    path: '/',
    name: 'starships',
    component: Starships,
  },
  {
    path: '/starship/:id',
    name: 'starship',
    component: Starship,
  }
]

export default routes
