//for a typical update loop on a classical emitter

You want to maintain a total list of particles and as they die you move them to
the back of the list and update the pointer for the end of the list

then when you need to spawn particles, you simply enliven particles from the dead
pool and move the index

for p in particles
  if p.timeAlive < 0 then kill(p)
  else                    p.timeAlive -= dT
  runPhysics()
  draw()
