#!/usr/bin/env ts-node

/**
 * Test Runner Script
 * 
 * This script provides a command-line interface to run role-based tests
 * for the submission app.
 */

import { runTests, testRole, TestRunner } from './test-runner';
import { ROLE_SUMMARY } from './role-activities.test';

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const role = args[1] as 'unauthenticated' | 'regularStudent' | 'admin';
const baseUrl = args[2] || 'http://localhost:3000';

async function main() {
  console.log('🎯 Submission App - Role-Based Testing Framework');
  console.log('='.repeat(60));

  try {
    switch (command) {
      case 'all':
        console.log('🚀 Running all tests for all roles...');
        const allResults = await runTests(baseUrl);
        console.log('\n✅ All tests completed!');
        break;

      case 'role':
        if (!role) {
          console.error('❌ Please specify a role: unauthenticated, regularStudent, or admin');
          process.exit(1);
        }
        console.log(`🧪 Running tests for role: ${ROLE_SUMMARY[role]?.name || role}`);
        const roleResult = await testRole(role, baseUrl);
        console.log(`\n✅ Tests completed for ${role}!`);
        break;

      case 'list':
        console.log('📋 Available roles and their activities:');
        Object.entries(ROLE_SUMMARY).forEach(([key, summary]) => {
          console.log(`\n👤 ${summary.name}:`);
          console.log(`   📊 Total activities: ${summary.totalActivities}`);
          console.log(`   📝 Activities:`);
          summary.activities.forEach(activity => {
            console.log(`      • ${activity}`);
          });
        });
        break;

      case 'help':
      case '--help':
      case '-h':
        printHelp();
        break;

      default:
        console.error('❌ Unknown command. Use "help" to see available commands.');
        process.exit(1);
    }
  } catch (error) {
    console.error('💥 Test execution failed:', error);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
🎯 Submission App - Role-Based Testing Framework

Usage: ts-node run-tests.ts <command> [options]

Commands:
  all                    Run all tests for all roles
  role <role>           Run tests for a specific role
  list                  List all roles and their activities
  help                  Show this help message

Roles:
  unauthenticated       Unauthenticated user tests
  regularStudent        Regular student tests
  admin                 Admin user tests

Options:
  <baseUrl>             Base URL for the application (default: http://localhost:3000)

Examples:
  ts-node run-tests.ts all
  ts-node run-tests.ts all http://localhost:3001
  ts-node run-tests.ts role admin
  ts-node run-tests.ts role regularStudent http://localhost:3000
  ts-node run-tests.ts list

Environment:
  Make sure your application is running before executing tests.
  The default base URL is http://localhost:3000.
  `);
}

// Run the main function
if (require.main === module) {
  main().catch(console.error);
}
