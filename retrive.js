import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js'

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJjN2I3MjRiNUVmRDkyMTgxNTNmOUM2NzgyMWYxRUQwMDkxMDQwYTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY0MDczNTg2NjMsIm5hbWUiOiJDb2RlVGhlUnVzaCJ9.J5ZZNPCLKvdMUbzwMrBCanSTh9ubHpDLs9S2D3pIDGM'

  //   // In a real app, it's better to read an access token from an
  //   // environement variable or other configuration that's kept outside of
  //   // your code base. For this to work, you need to set the
  //   // WEB3STORAGE_TOKEN environment variable before you run your code.
  //   return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function getValue() {
  var cid = document.getElementById("cid").value;
  return cid
}

document.getElementById("submit").onclick = async function retrieve() {
  const cid = getValue()
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    alert("File Doesn't exist, check your CID");
  }
  
  else {
    alert("File has been opened!");
    window.open("https://" + cid + ".ipfs.w3s.link", "_blank");
  }
}