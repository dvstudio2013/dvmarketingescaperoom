"use client"

import { useState } from "react"

export default function Home() {
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [progress, setProgress] = useState({
    kirakat: false,
    telefon: false,
    penztar: false,
    hirdetes: false,
  })

  const allDone = Object.values(progress).every(Boolean)

  function open(type: string) {
    setActive(type)
  }

  function close() {
    if (active && active !== "exit") {
      setProgress(prev => ({ ...prev, [active]: true }))
    }
    setActive(null)
  }

  if (!started) {
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",padding:20,textAlign:"center"}}>
        <h1>Ki tudsz szabadulni a láthatatlanságból?</h1>
        <p>Lépj be a Marketing Reality Room-ba.</p>
        <button onClick={() => setStarted(true)} style={{padding:12,background:"#fff",color:"#000",border:"none"}}>
          Belépek
        </button>
      </div>
    )
  }

  return (
    <div style={{position:"relative",height:"100vh"}}>

      <button style={{position:"absolute",top:80,left:20}} onClick={()=>open("kirakat")}>Kirakat</button>
      <button style={{position:"absolute",top:120,right:20}} onClick={()=>open("telefon")}>Telefon</button>
      <button style={{position:"absolute",bottom:150,left:20}} onClick={()=>open("penztar")}>Pénztár</button>
      <button style={{position:"absolute",bottom:100,right:20}} onClick={()=>open("hirdetes")}>Hirdetés</button>

      {allDone && (
        <button style={{position:"absolute",bottom:30,left:"50%",transform:"translateX(-50%)",padding:12,background:"#fff",color:"#000"}} onClick={()=>open("exit")}>
          Nyisd ki az ajtót
        </button>
      )}

      {active && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#111",padding:20,width:"90%",maxWidth:400}}>
            {active === "exit" ? (
              <ExitForm />
            ) : (
              <p>
                {{
                  kirakat: "Miért nem látják a vállalkozásod?",
                  telefon: "A tartalmad valóban elad?",
                  penztar: "Van forgalmad, de nincs bevételed?",
                  hirdetes: "Hirdetsz, de nincs rendszer mögötte?",
                }[active]}
              </p>
            )}
            <button onClick={close} style={{marginTop:20}}>Bezár</button>
          </div>
        </div>
      )}
    </div>
  )
}

function ExitForm() {
  async function submit(e:any){
    e.preventDefault()
    const form = e.target

    await fetch("/api/send-email",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name:form.name.value,
        email:form.email.value,
        business:form.business.value,
        website:form.website.value
      })
    })

    alert("Sikeres jelentkezés!")
  }

  return (
    <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:10}}>
      <input name="name" placeholder="Név" required />
      <input name="email" placeholder="Email" required />
      <input name="business" placeholder="Vállalkozás típusa" />
      <input name="website" placeholder="Weboldal" />
      <button style={{padding:10,background:"#fff",color:"#000"}}>Kérem az auditot</button>
    </form>
  )
}
