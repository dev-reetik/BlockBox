import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js'

function getAccessToken() {
  //Accessing Storage Token
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFODU3RUU4M0FDOTBmQTgwRUI1ZkJCMUQ3Nzg2ODlCMGMyOGMwMDYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA5NjMwNzE3MjcsIm5hbWUiOiJOaW1idXMgMmsyMyJ9.K5655HTdno4DTFdKRmEJ68Ooa-RQgF7HSJW63B-IvQg';
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function getFiles() {
  //Accessing Input Files
  const fileInput = document.querySelector('input[type="file"]')
  return fileInput.files
}

document.getElementById("submit").onclick = async function storeFiles() {
  const name=document.getElementById('name');
  const files = getFiles();
  const client = makeStorageClient()
  const cid = await client.put(files,{name:name.value})
  window.alert('File stored with cid: ')
  document.upload.reset();
};

