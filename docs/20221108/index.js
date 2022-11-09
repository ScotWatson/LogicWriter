/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const asyncWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

const asyncErrorLog = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/Debug/20221107/ErrorLog.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

(async function () {
  try {
    const modules = await Promise.all( [ asyncWindow, asyncErrorLog ] );
    start(modules);
  } catch (e) {
    console.error(e);
  }
})();

async function start( [ evtWindow, ErrorLog ] ) {
  try {
    const pInput = document.createElement("p");
    document.body.appendChild(pInput);
    const btnBackspace = createButton("&#x232B;");
    document.body.appendChild(btnBackspace);
    const btnEntails = createButton("&#x22A2;");
    document.body.appendChild(btnEntails);
    const btnFalsehood = createButton("&#x21AF;");
    document.body.appendChild(btnFalsehood);
    const btnOpenParen = createButton("(");
    document.body.appendChild(btnOpenParen);
    const btnCloseParen = createButton(")");
    document.body.appendChild(btnCloseParen);
    const btnDisjunct = createButton("&#x2228;");
    document.body.appendChild(btnDisjunct);
    
    const btnOverbar = createButton("&#x0305;");
    document.body.appendChild(btnBackspace);
    function createButton(caption) {
      const btn = document.createElement("div");
      btn.style.display = "table-cell";
      btn.style.width = "50px";
      btn.style.height = "50px";
      btn.style.fontSize = "24pt";
      btn.style.textJustify = "center";
      
      btn.innerHTML = caption;
      return btn;
    }
  } catch (e) {
    ErrorLog.rethrow({
      functionName: "start",
      error: e,
    });
  }
}
