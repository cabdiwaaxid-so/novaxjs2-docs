document.addEventListener('DOMContentLoaded', () => {
      // Add copy buttons to all pre elements
      const preElements = document.querySelectorAll('pre');
      
      preElements.forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.title = 'Copy to clipboard';
        
        copyBtn.addEventListener('click', () => {
          const code = pre.querySelector('code').textContent;
          navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = 'Copy';
            }, 2000);
          });
        });
        
        pre.appendChild(copyBtn);
      });
      
      // Initialize Prism syntax highlighting
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    });