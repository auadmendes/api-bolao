import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/auadmendes.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Pool example',
      code: 'Bol123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-05T00:12:34.332Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T00:15:50.332Z',
      firstTeamCountryCode: 'CA',
      secondTeamCountryCode: 'IT',

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 3,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()