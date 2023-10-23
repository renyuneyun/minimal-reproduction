import { PathFactory } from 'ldflex';
import { default as ComunicaEngine } from '@ldflex/comunica';
import { namedNode } from '@rdfjs/data-model';

export function test() {
  // The JSON-LD context for resolving properties
  const context = {
    '@context': {
      '@vocab': 'http://xmlns.com/foaf/0.1/',
      friends: 'knows',
      label: 'http://www.w3.org/2000/01/rdf-schema#label',
      rbn: 'https://ruben.verborgh.org/profile/#'
    }
  }
  // The query engine and its source
  const queryEngine = new ComunicaEngine('https://ruben.verborgh.org/profile/')
  // The object that can create new paths
  const path = new PathFactory({ context, queryEngine })

  const ruben = path.create({ subject: namedNode('https://ruben.verborgh.org/profile/#me') })
  showPerson(ruben)

  async function showPerson(person) {
    console.log(`This person is ${await person.name}`)

    console.log(`${await person.givenName} is interested in:`)
    for await (const name of person.interest.label) console.log(`- ${name}`)

    console.log(`${await person.givenName} is friends with:`)
    for await (const name of person.friends.givenName) console.log(`- ${name}`)
  }
}
