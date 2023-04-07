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

function getFiles() {
  const fileInput = document.querySelector('input[type="file"]')
  return fileInput.files
}

document.getElementById("submit").onclick = async function storeFiles() {
  const files = getFiles()
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  window.alert('File stored with cid: ' + cid)
  return cid
};


// async function storeWithProgress(files) {
//     // show the root cid as soon as it's ready
//     const onRootCidReady = cid => {
//         console.log('uploading files with cid:', cid)
//     }

//     // when each chunk is stored, update the percentage complete and display
//     const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
//     let uploaded = 0

//     const onStoredChunk = size => {
//         uploaded += size
//         const pct = 100 * (uploaded / totalSize)
//         console.log(`Uploading... ${pct.toFixed(2)}% complete`)
//     }

//     // makeStorageClient returns an authorized web3.storage client instance
//     const client = makeStorageClient()

//     // client.put will invoke our callbacks during the upload
//     // and return the root cid when the upload completes
//     return client.put(files, { onRootCidReady, onStoredChunk })
// }