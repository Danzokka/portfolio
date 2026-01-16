import React, { ReactNode } from 'react'
import { Separator } from '../ui/separator'
import { DATA } from '@/data/resume'
import { Badge } from '../ui/badge'

const Skills = () => {
  return (
    <div>
      {/* Skills List */}
      {
        DATA.skills.map((skill) => (
          <Badge key={skill.name} variant={'default'}>
            {skill.icon as unknown as ReactNode} <p>{skill.name}</p>
          </Badge>
        ))
      }
    </div>
  )
}

const Works = () => {
  return (
    <div>
      {/* Works List */}
      a
    </div>
  )
}

const Meet = () => {
  return (
    <section className='min-h-screen h-full w-full grid grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-8'>
        <h2 className='text-4xl font-bold mb-4'>Meet the Rafaeel</h2>
        <p className='text-lg text-center max-w-md'>
          Our team is composed of passionate professionals dedicated to
          delivering the best solutions for our clients. Get to know the people
          behind the projects.
        </p>
        <Separator />
        <Skills />
        <Separator />
        <Works />
      </div>
      <div>
        {/* Image */}
        a
      </div>
    </section>
  )
}

export default Meet