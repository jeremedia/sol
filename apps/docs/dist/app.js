const SESSION_COLOR_SEQUENCE = Object.freeze([1, 5, 8, 7, 10, 11, 12]);

const languageSamples = Object.freeze({
  en: {
    copy: "Typography in Sol is not decoration. It is spacing, rhythm, and state rendered as a system.",
    label: "English"
  },
  ja: {
    copy: "タイポグラフィは装飾ではなく、間隔とリズムを備えたシステムです。",
    label: "Japanese"
  },
  ko: {
    copy: "타이포그래피는 장식이 아니라 간격과 리듬을 지닌 시스템입니다.",
    label: "Korean"
  },
  "zh-Hans": {
    copy: "排版不是装饰，而是由间距、节奏与状态构成的系统。",
    label: "Chinese Simplified"
  }
});

function applySessionColor(rootElement, colorNumber) {
  rootElement.style.setProperty("--color--session", `var(--color--brand--${colorNumber})`);
  rootElement.style.setProperty(
    "--color--session--rgb",
    `var(--color--brand--${colorNumber}--rgb)`
  );
}

function bindSessionFixture() {
  const rootElement = document.documentElement;
  const button = document.querySelector("[data-session-next]");
  const label = document.querySelector("[data-session-label]");

  if (!button || !label) {
    return;
  }

  let index = 0;

  const render = () => {
    const colorNumber = SESSION_COLOR_SEQUENCE[index];
    applySessionColor(rootElement, colorNumber);
    label.textContent = `Brand ${colorNumber}`;
  };

  button.addEventListener("click", () => {
    index = (index + 1) % SESSION_COLOR_SEQUENCE.length;
    render();
  });

  render();
}

function bindHighContrastFixture() {
  const wrapper = document.querySelector("[data-high-contrast-fixture]");
  const button = document.querySelector("[data-high-contrast-toggle]");

  if (!wrapper || !button) {
    return;
  }

  const render = () => {
    const enabled = wrapper.hasAttribute("data-high-contrast");
    button.classList.toggle("is-active", enabled);
    button.textContent = enabled ? "High Contrast On" : "High Contrast Off";
  };

  button.addEventListener("click", () => {
    if (wrapper.hasAttribute("data-high-contrast")) {
      wrapper.removeAttribute("data-high-contrast");
    } else {
      wrapper.setAttribute("data-high-contrast", "");
    }

    render();
  });

  render();
}

function bindLanguageFixture() {
  const sample = document.querySelector("[data-language-sample]");
  const label = document.querySelector("[data-language-label]");
  const buttons = document.querySelectorAll("[data-language]");

  if (!sample || !label || buttons.length === 0) {
    return;
  }

  const render = (language) => {
    const sampleData = languageSamples[language];

    if (!sampleData) {
      return;
    }

    sample.lang = language;
    sample.textContent = sampleData.copy;
    label.textContent = sampleData.label;

    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === language);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      render(button.dataset.language);
    });
  });

  render("en");
}

bindSessionFixture();
bindHighContrastFixture();
bindLanguageFixture();
