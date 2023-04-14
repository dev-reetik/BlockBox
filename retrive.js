import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js'

function getAccessToken() {
  //Storage Access Token
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFODU3RUU4M0FDOTBmQTgwRUI1ZkJCMUQ3Nzg2ODlCMGMyOGMwMDYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA5NjMwNzE3MjcsIm5hbWUiOiJOaW1idXMgMmsyMyJ9.K5655HTdno4DTFdKRmEJ68Ooa-RQgF7HSJW63B-IvQg'

}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function getValue() {
  //geting cid
  var cid = document.getElementById("cid").value;
  return cid;
}


document.getElementById("submit").onclick = async function retrieve() {

  //retrieving data files

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