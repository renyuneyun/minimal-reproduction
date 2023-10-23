import { default as data } from '@solid/query-ldflex'  // Problematic

export function test() {
  const ruben = data['https://ruben.verborgh.org/profile/#me']
  showProfile(ruben)

  async function showProfile(person) {
    const label = await person.label
    console.log(`\nNAME: ${label}`)

    console.log('\nTYPES')
    for await (const type of person.type) console.log(`  - ${type}`)

    console.log('\nFRIENDS')
    for await (const name of person.friends.firstName) console.log(`  - ${name} is a friend`)
  }
}
