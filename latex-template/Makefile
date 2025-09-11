# Modern LaTeX Report Template Makefile
# Supports multiple LaTeX engines and automatic dependency management

# Configuration
MAIN_FILE = sample-report
LATEX_ENGINE = xelatex
PDF_VIEWER = xdg-open

# File extensions
TEX_FILES = $(wildcard *.tex)
CLS_FILES = $(wildcard *.cls)
PDF_FILE = $(MAIN_FILE).pdf

# Auxiliary file extensions to clean
AUX_EXTENSIONS = aux log toc out fls fdb_latexmk synctex.gz nav snm vrb bbl blg

# Colors for output (if supported)
RED = \033[0;31m
GREEN = \033[0;32m
BLUE = \033[0;34m
YELLOW = \033[1;33m
NC = \033[0m

# Default target
.PHONY: all
all: $(PDF_FILE)

# Main compilation target
$(PDF_FILE): $(MAIN_FILE).tex $(CLS_FILES)
	@echo -e "$(BLUE)🚀 Compiling with $(LATEX_ENGINE)...$(NC)"
	$(LATEX_ENGINE) -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	@echo -e "$(YELLOW)📄 Second pass for references...$(NC)"
	$(LATEX_ENGINE) -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	@echo -e "$(GREEN)✅ Compilation completed: $(PDF_FILE)$(NC)"

# Quick compilation (single pass)
.PHONY: quick
quick: $(MAIN_FILE).tex
	@echo -e "$(YELLOW)⚡ Quick compilation (single pass)...$(NC)"
	$(LATEX_ENGINE) -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	@echo -e "$(GREEN)✅ Quick compilation completed$(NC)"

# Compile with pdfLaTeX
.PHONY: pdflatex
pdflatex:
	@echo -e "$(BLUE)📄 Compiling with pdfLaTeX...$(NC)"
	pdflatex -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	pdflatex -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	@echo -e "$(GREEN)✅ pdfLaTeX compilation completed$(NC)"

# Compile with XeLaTeX (recommended)
.PHONY: xelatex
xelatex:
	@echo -e "$(BLUE)🎨 Compiling with XeLaTeX...$(NC)"
	xelatex -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	xelatex -interaction=nonstopmode -halt-on-error $(MAIN_FILE).tex
	@echo -e "$(GREEN)✅ XeLaTeX compilation completed$(NC)"

# Watch mode (requires entr or inotify-tools)
.PHONY: watch
watch:
	@echo -e "$(YELLOW)👀 Watching for file changes...$(NC)"
	@echo "Press Ctrl+C to stop"
	@if command -v entr >/dev/null 2>&1; then \
		ls $(MAIN_FILE).tex $(CLS_FILES) | entr -c make quick; \
	elif command -v inotifywait >/dev/null 2>&1; then \
		while inotifywait -e modify $(MAIN_FILE).tex $(CLS_FILES); do make quick; done; \
	else \
		echo -e "$(RED)❌ Please install 'entr' or 'inotify-tools' for watch mode$(NC)"; \
		exit 1; \
	fi

# Open the generated PDF
.PHONY: view open
view open: $(PDF_FILE)
	@echo -e "$(BLUE)📖 Opening PDF...$(NC)"
	@if command -v $(PDF_VIEWER) >/dev/null 2>&1; then \
		$(PDF_VIEWER) $(PDF_FILE) & \
	elif command -v open >/dev/null 2>&1; then \
		open $(PDF_FILE); \
	elif command -v start >/dev/null 2>&1; then \
		start $(PDF_FILE); \
	else \
		echo -e "$(YELLOW)⚠️  Please open $(PDF_FILE) manually$(NC)"; \
	fi

# Clean auxiliary files
.PHONY: clean
clean:
	@echo -e "$(YELLOW)🧹 Cleaning auxiliary files...$(NC)"
	@for ext in $(AUX_EXTENSIONS); do \
		if [ -f "$(MAIN_FILE).$$ext" ]; then \
			rm -f "$(MAIN_FILE).$$ext" && echo "   Removed: $(MAIN_FILE).$$ext"; \
		fi; \
	done
	@echo -e "$(GREEN)✨ Cleanup completed$(NC)"

# Clean everything including PDF
.PHONY: clean-all distclean
clean-all distclean: clean
	@echo -e "$(YELLOW)🗑️  Removing PDF file...$(NC)"
	@if [ -f "$(PDF_FILE)" ]; then \
		rm -f "$(PDF_FILE)" && echo "   Removed: $(PDF_FILE)"; \
	fi
	@echo -e "$(GREEN)🧽 Deep cleanup completed$(NC)"

# Check LaTeX installation
.PHONY: check
check:
	@echo -e "$(BLUE)🔍 Checking LaTeX installation...$(NC)"
	@echo -e "$(YELLOW)Checking engines:$(NC)"
	@if command -v xelatex >/dev/null 2>&1; then \
		echo -e "  ✅ XeLaTeX: $$(xelatex --version | head -1)"; \
	else \
		echo -e "  ❌ XeLaTeX: Not found"; \
	fi
	@if command -v pdflatex >/dev/null 2>&1; then \
		echo -e "  ✅ pdfLaTeX: $$(pdflatex --version | head -1)"; \
	else \
		echo -e "  ❌ pdfLaTeX: Not found"; \
	fi
	@echo -e "$(YELLOW)Checking required packages:$(NC)"
	@for pkg in tikz tcolorbox fontspec; do \
		if kpsewhich $$pkg.sty >/dev/null 2>&1; then \
			echo -e "  ✅ $$pkg: Found"; \
		else \
			echo -e "  ❌ $$pkg: Not found"; \
		fi; \
	done

# Display statistics about the document
.PHONY: stats
stats: $(PDF_FILE)
	@echo -e "$(BLUE)📊 Document statistics:$(NC)"
	@echo -e "$(YELLOW)File information:$(NC)"
	@ls -lh $(PDF_FILE) | awk '{printf "  📄 Size: %s\n", $$5}'
	@echo -e "  📅 Modified: $$(stat -c %y $(PDF_FILE) 2>/dev/null || stat -f %Sm $(PDF_FILE) 2>/dev/null || echo 'Unknown')"
	@if command -v pdfinfo >/dev/null 2>&1; then \
		echo -e "$(YELLOW)PDF information:$(NC)"; \
		pdfinfo $(PDF_FILE) 2>/dev/null | grep -E "(Pages|Title|Author|Creator)" | sed 's/^/  /' || true; \
	fi
	@echo -e "$(YELLOW)Source statistics:$(NC)"
	@wc -l $(MAIN_FILE).tex | awk '{printf "  📝 Lines in main file: %s\n", $$1}'
	@find . -name "*.tex" -exec cat {} \; | wc -w | awk '{printf "  🔤 Total words: %s\n", $$1}'

# Help target
.PHONY: help
help:
	@echo -e "$(BLUE)Modern LaTeX Report Template - Makefile$(NC)"
	@echo ""
	@echo -e "$(YELLOW)Available targets:$(NC)"
	@echo "  all         - Compile the document (default)"
	@echo "  quick       - Quick compilation (single pass)"
	@echo "  xelatex     - Compile with XeLaTeX (recommended)"
	@echo "  pdflatex    - Compile with pdfLaTeX (fallback)"
	@echo "  watch       - Watch for changes and auto-compile"
	@echo "  view/open   - Open the generated PDF"
	@echo "  clean       - Remove auxiliary files"
	@echo "  clean-all   - Remove all generated files"
	@echo "  check       - Check LaTeX installation"
	@echo "  stats       - Show document statistics"
	@echo "  help        - Show this help message"
	@echo ""
	@echo -e "$(YELLOW)Configuration:$(NC)"
	@echo "  MAIN_FILE   = $(MAIN_FILE)"
	@echo "  LATEX_ENGINE= $(LATEX_ENGINE)"
	@echo "  PDF_VIEWER  = $(PDF_VIEWER)"
	@echo ""
	@echo -e "$(YELLOW)Examples:$(NC)"
	@echo "  make                    # Compile with default settings"
	@echo "  make xelatex && make view  # Compile and open"
	@echo "  make watch              # Auto-compile on changes"
	@echo "  make clean && make all  # Clean build"

# Force rebuild
.PHONY: force rebuild
force rebuild:
	@echo -e "$(YELLOW)🔄 Force rebuilding...$(NC)"
	$(MAKE) clean
	$(MAKE) all

# Default help if no target specified
.DEFAULT_GOAL := help