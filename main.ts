var obsidian = require('obsidian')

class GuitarTabsViewerPlugin extends obsidian.Plugin {
	async onload() {
		console.log('Guitar Tabs Viewer plugin loaded');

		this.registerMarkdownPostProcessor((element, context) => {
			// Ищем блоки кода внутри pre элементов (стандартная структура Markdown)
			const codeBlocks = element.querySelectorAll('pre > code');

			codeBlocks.forEach((codeblock) => {
				const className = codeblock.className;
				if (!className) return;

				// Проверяем классы
				if (className.includes('language-tab') || className.includes('language-tabs')) {
					this.processTabContent(codeblock);
				}
			});
		});
	}

	processTabContent(codeblock) {
		const targetSymbol = '·';

		// Работаем с текстовым содержимым, а не innerHTML
		const originalText = codeblock.textContent;
		if (!originalText) return;

		const processedText = originalText
			.replaceAll('-', targetSymbol)
			.replaceAll('–', targetSymbol)
			.replaceAll('—', targetSymbol)
			.replaceAll('─', targetSymbol)
			.replaceAll('‒', targetSymbol);

		// Устанавливаем обработанный текст
		codeblock.textContent = processedText;
	}

	onunload() {
		console.log('Guitar Tabs Viewer plugin unloaded');
	}
}
module.exports = GuitarTabsViewerPlugin
