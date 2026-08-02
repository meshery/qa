# Copyright Meshery Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

include build/Makefile.core.mk
include build/Makefile.show-help.mk

# --------------------------------------------------
# Helpers
# --------------------------------------------------

# Replace the destination ONLY after the source is validated AND the copy has
# fully succeeded. The copy lands in a temporary sibling dir first; the
# destination is removed and swapped in only once that copy completes, so a
# misconfigured source var, a mid-copy I/O error, or a disappearing source can
# never leave the committed results half-deleted. An unset/missing source skips
# entirely and leaves the destination intact. `cp -a "$src/."` copies directory
# contents (and succeeds on an empty source) without relying on glob expansion.
define results-sync
	@if [ -n "$($(1))" ] && [ -d "$($(1))" ]; then \
		echo "Copying results from $($(1)) → $(2)"; \
		tmp="$(2).tmp.$$$$"; \
		rm -rf "$$tmp"; mkdir -p "$$tmp"; \
		if cp -a "$($(1))/." "$$tmp/"; then \
			rm -rf $(2); mv "$$tmp" $(2); \
		else \
			echo "Copy failed; destination $(2) left intact"; rm -rf "$$tmp"; exit 1; \
		fi; \
	else \
		echo "$(1) not set or directory does not exist, skipping (destination $(2) left intact)"; \
	fi
endef


define results-sync-path
	@if [ -n "$(1)" ] && [ -d "$(1)" ]; then \
		echo "Copying results from $(1) → $(2)"; \
		tmp="$(2).tmp.$$$$"; \
		rm -rf "$$tmp"; mkdir -p "$$tmp"; \
		if cp -a "$(1)/." "$$tmp/"; then \
			rm -rf $(2); mv "$$tmp" $(2); \
		else \
			echo "Copy failed; destination $(2) left intact"; rm -rf "$$tmp"; exit 1; \
		fi; \
	else \
		echo "$(1) not set or directory does not exist, skipping (destination $(2) left intact)"; \
	fi
endef

# --------------------------------------------------
# Targets
# --------------------------------------------------
.PHONY: report-generate meshery-results-sync meshery-server-results-sync mesheryctl-results-sync mesheryctl-bats-results-sync mesheryctl-unit-results-sync report-open report

## Sync Meshery Test Results
meshery-results-sync: 
	@echo "Syncing Meshery Test Results..."
	$(call results-sync,MESHERY_RESULTS_PATH,meshery-results)

## Sync Server Go Unit Test Results
meshery-server-results-sync:
	@echo "Syncing Server Go Unit Test Results..."
	$(call results-sync,MESHERY_SERVER_RESULTS_PATH,meshery-server-results)

## Sync mesheryctl Test Results (DEPRECATED - shared by BATS e2e and go unit
## feeders, which clobbered each other since results-sync wipes its target.
## Kept as a back-compat alias; new feeders use the split targets below.)
mesheryctl-results-sync:
	@echo "Syncing mesheryctl Test Results..."
	$(call results-sync,MESHERYCTL_RESULTS_PATH,mesheryctl-results)

## Sync mesheryctl BATS e2e Test Results
mesheryctl-bats-results-sync:
	@echo "Syncing mesheryctl BATS e2e Test Results..."
	$(call results-sync,MESHERYCTL_BATS_RESULTS_PATH,mesheryctl-bats-results)

## Sync mesheryctl Go unit Test Results
mesheryctl-unit-results-sync:
	@echo "Syncing mesheryctl Go unit Test Results..."
	$(call results-sync,MESHERYCTL_UNIT_RESULTS_PATH,mesheryctl-unit-results)

## Generic sync - make project-results-sync RESULTS_DIR=path/to/results PROJECT=myproject
project-results-sync:
	@if [ -z "$(RESULTS_DIR)" ] || [ -z "$(PROJECT)" ]; then \
		echo "RESULTS_DIR and PROJECT must be set"; \
        exit 1; \
    fi
	@echo "Syncing $(PROJECT) results..."
	$(call results-sync-path,$(RESULTS_DIR),$(PROJECT)-results)



## Setup environment; Install prequisites
report-setup:
	npm i

## Generate fresh QA Report
report-build: 
	@echo "Generating QA Report..."
	rm -rf allure-results || true
	mkdir -p allure-results/history
	@if [ -f history.jsonl ]; then \
		echo "Restoring prior history..."; \
		cp history.jsonl allure-results/history/history.jsonl; \
	else \
		echo "No prior history — first run"; \
	fi
	cp kanvas-results/* allure-results/ || true
	cp meshery-results/* allure-results/ || true
	cp meshery-server-results/* allure-results/ || true
	# NOTE: the legacy mesheryctl-results/ dir is intentionally NOT copied. Its
	# results are frozen (both feeders now write to the split dirs below), so
	# including it would merge stale pre-split results with current ones. The
	# split dirs repopulate on the next CI run of each feeder.
	cp mesheryctl-bats-results/* allure-results/ || true
	cp mesheryctl-unit-results/* allure-results/ || true
	cp remote-provider-results/* allure-results/ || true
	npm run report:generate

## Open QA report in browser
report: report-build 
	@echo "Opening QA Report..."
	npm run report:open


# --------------------------------------------------
# Extension Targets
# EXTENSION POINT (see https://docs.meshery.io/extensibility)
# OPEN AN ISSUE TO ADD YOUR EXTENSION HERE
# --------------------------------------------------
.PHONY: results-kanvas-sync remote-provider-results-sync

## Sync Kanvas Test Results
results-kanvas-sync: 
	@echo "Syncing Kanvas Test Results..."
	$(call results-sync,KANVAS_RESULTS_PATH,kanvas-results)

## Sync Remote Provider Test Results
remote-provider-results-sync: 
	@echo "Syncing Remote Provider Test Results..."
	$(call results-sync,REMOTE_PROVIDER_RESULTS_PATH,remote-provider-results)

