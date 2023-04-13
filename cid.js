import { Web3Storage } from "https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFODU3RUU4M0FDOTBmQTgwRUI1ZkJCMUQ3Nzg2ODlCMGMyOGMwMDYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA5NjMwNzE3MjcsIm5hbWUiOiJOaW1idXMgMmsyMyJ9.K5655HTdno4DTFdKRmEJ68Ooa-RQgF7HSJW63B-IvQg";

  //   // In a real app, it's better to read an access token from an
  //   // environement variable or other configuration that's kept outside of
  //   // your code base. For this to work, you need to set the
  //   // WEB3STORAGE_TOKEN environment variable before you run your code.
  //   return process.env.WEB3STORAGE_TOKEN
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function listWithLimits() {
  const table = document.getElementById("table");
  table.style.display = "none";
  const client = makeStorageClient();
  const before = new Date().toISOString();
  const maxResults = 10;
  const tbody = document.getElementById("uploads");
  const loader = document.getElementById("loader");

  loader.style.display = "block";
  // Show the loader

  for await (const upload of client.list({ before, maxResults })) {
    const tr = document.createElement("tr");
    const cidTd = document.createElement("td");
    const cidName = document.createElement("td");
    const createdTd = document.createElement("td");
    const viewFile = document.createElement("td");
    // const Share = document.createElement("td");
    const button = document.createElement("button");
    const cidData = document.createElement("a");
    // const shareBtn = document.createElement("button");

    // console.log(upload);
    // cidTd.createTextNode(upload.cid);
    cidTd.appendChild(cidData);
    const CidText= document.createTextNode(upload.cid);
    cidData.appendChild(CidText);
    const url=upload.cid;
    cidData.setAttribute("href",  `#`);
    cidData.addEventListener('click', function(event) {
      // Prevent the link from navigating to a new page
      event.preventDefault();
    
      // Get the text data to copy
      const textToCopy = upload.cid;
      navigator.clipboard.writeText(textToCopy);
      alert("Copied the data to clipboard");
    });

    cidName.textContent = upload.name;

    // viewFile.innerHTML = `View File`;

    viewFile.style.color = "blue";
    viewFile.style.cursor = "pointer";
    viewFile.style.textAlign = "center";

    // const fileBtn = document.getElementById('viewSource')

    button.innerHTML = "View File";
    button.style.marginBottom = "12px";

    button.addEventListener("click", () => {
      const data = upload.cid;
      window.open("https://" + data + ".ipfs.w3s.link", "_blank");
    });


    // cidTd.addEventListener("mouseenter", (event) => {
    //         cidTd.innerHTML="<button class='Share'>Share</button>";
    // });
    
    // cidTd.addEventListener('mouseout', () => {
    //   cidTd.textContent = upload.cid;
    //   // cidTd.innerHTML=`<h3>{upload.cid}</h3>`

    // });

    // shareBtn.innerHTML = "<button class='Share'>Share</button>"

    createdTd.textContent = new Date(upload.created).toLocaleString();
    tr.appendChild(cidName);
    tr.appendChild(cidTd);
    // tr.appendChild(Share);
    tr.appendChild(createdTd);
    tr.appendChild(viewFile);
    viewFile.appendChild(button);
    // Share.appendChild(shareBtn);
    tbody.appendChild(tr);

    // cidName.innerHTML=`<h1>Hi</h1>`
  }

  loader.style.display = "none";
  table.style.display = "";
}

// Call the function after the HTML has loaded
window.onload = listWithLimits;
